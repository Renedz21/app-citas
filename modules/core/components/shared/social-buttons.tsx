import { Fragment } from "react";
import { Button } from "@/modules/core/components/ui/button";

import GoogleIcon from "@/assets/images/google-logo.svg";
import AppleIcon from "@/assets/images/apple.svg";

export function SocialButtons() {
  return (
    <Fragment>
      <Button
        variant="outline"
        title="Continuar con Apple"
        onPress={() => {}}
        icon={<AppleIcon width={24} height={24} />}
      />
      <Button
        variant="outline"
        title="Continuar con Google"
        icon={<GoogleIcon width={24} height={24} />}
      />
    </Fragment>
  );
}
