import { validateAdminSession, validateSession } from "@/utils/lucia";
import { ComponentType } from "react";

const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return async (props: P) => {
    const isAuth = await validateAdminSession();

    if (!isAuth) {
      return <h1>You are not authenticated or an admin!</h1>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
