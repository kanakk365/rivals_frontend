import { useAuthStore, AuthUser } from "@/store/authStore";

// ===== API Configuration =====
const MVC_API_URL = "https://mvc.bluesuite.in";
const RIVALIS_API_URL = "https://api.rivalis.ai";
const DIRECT_LOGIN_SECRET = "UmMG0HEZNrCmx0OlqC1FERF2wnMyU3FrjStmtA95CNQ";

// ===== API Response Types =====

interface MvcLoginResponse {
  status: boolean;
  data: {
    token: string;
    id: number;
    uid: string;
    name: string;
    email: string;
    // user_type is ignored now
  };
  message: string;
}

interface GetLoggedUserResponse {
  status: boolean;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      password: string; // password hash
    };
    // products array ignored
  };
  message: string;
}

interface DirectLoginResponse {
  access_token: string;
  message: string;
  token_type: string;
}

// ===== API Functions =====

/**
 * Step 1: Normal login via MVC backend
 */
export async function mvcLogin(
  email: string,
  password: string,
): Promise<MvcLoginResponse> {
  const response = await fetch(`${MVC_API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}

/**
 * Step 2: Get logged user details
 */
export async function getLoggedUser(
  token: string,
): Promise<GetLoggedUserResponse> {
  const response = await fetch(`${MVC_API_URL}/api/get-logged-user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get user details");
  }

  return response.json();
}

/**
 * Step 3: Direct login using the login secret
 */
export async function directLogin(
  name: string,
  email: string,
  passwordHash: string,
): Promise<DirectLoginResponse> {
  const response = await fetch(`${RIVALIS_API_URL}/api/auth/direct-login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Direct-Login-Secret": DIRECT_LOGIN_SECRET,
    },
    body: JSON.stringify({
      name,
      email,
      password_hash: passwordHash,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || errorData.message || "Direct login failed",
    );
  }

  return response.json();
}

// ===== Token Decoding =====
function decodeToken(tokenParam: string): string {
  if (tokenParam.includes("|")) return tokenParam;
  try {
    const decoded = atob(tokenParam);
    if (decoded.includes("|")) return decoded;
    return tokenParam;
  } catch {
    return tokenParam;
  }
}

// ===== Combined Flows =====

export async function ssoLogin(tokenParam: string): Promise<AuthUser> {
  const token = decodeToken(tokenParam);

  const userResponse = await getLoggedUser(token);
  if (!userResponse.status) {
    throw new Error(userResponse.message || "Failed to get user details");
  }

  const { user } = userResponse.data;

  const directLoginResponse = await directLogin(
    user.name,
    user.email,
    user.password,
  );

  return buildAuthUser(directLoginResponse, user);
}

export async function normalLogin(
  email: string,
  password: string,
): Promise<AuthUser> {
  const mvcResponse = await mvcLogin(email, password);
  if (!mvcResponse.status) {
    throw new Error(mvcResponse.message || "Login failed");
  }

  const userResponse = await getLoggedUser(mvcResponse.data.token);
  if (!userResponse.status) {
    throw new Error(userResponse.message || "Failed to get user details");
  }

  const { user } = userResponse.data;

  const directLoginResponse = await directLogin(
    user.name,
    user.email,
    user.password,
  );

  return buildAuthUser(directLoginResponse, user);
}

// ===== Simplfied Helper =====
function buildAuthUser(
  response: DirectLoginResponse,
  mvcUser: { id: number; name: string; email: string },
): AuthUser {
  return {
    token: response.access_token,
    id: mvcUser.id,
    name: mvcUser.name,
    email: mvcUser.email,
    // Role removed
  };
}

export function saveAuthUser(user: AuthUser): void {
  useAuthStore.getState().setUser(user);
}
