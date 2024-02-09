// session.service.ts
export function getSession(key: string): any {
  try {
    const sessionData = sessionStorage.getItem(key);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    return null;
  }
}

export function setSession(key: string,value:string): any {
  try {
    sessionStorage.setItem(key,value);
    return true
  } catch (error) {
    return false;
  }
}

export function removeSession(key: string): any {
    try {
      sessionStorage.removeItem(key);
      return true
    } catch (error) {
      return false;
    }
  }
  