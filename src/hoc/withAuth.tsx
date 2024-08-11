import { validateSession } from "@/utils/lucia";
import { ComponentType } from "react";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return async (props: P) => {
    const isAuth = await validateSession();

    if (!isAuth) {
      return <h1>You are not authenticated</h1>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
