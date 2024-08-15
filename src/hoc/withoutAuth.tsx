import { validateSession } from "@/utils/lucia";
import { ComponentType } from "react";

const withoutAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return async (props: P) => {
    const isAuth = await validateSession();

    if (isAuth) {
      return <h1>You are already authenticated. No need to signup</h1>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withoutAuth;
