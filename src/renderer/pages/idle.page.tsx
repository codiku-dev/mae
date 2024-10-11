import { ROUTES } from "@/routes";

import { WindowAPI } from "@/main/modules/window/window-api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ShortcutAPI } from "@/main/modules/shortcuts/shortcut-api";
import { logToMain } from "../libs/utils";

export function IdlePage() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    useEffect(() => {

        const handleGoHome = () => {
            navigate(ROUTES.home)
            setTimeout(() => {
                WindowAPI.toggleWindowWithAnimation(true)
            }, 100)
        }
        logToMain("Add shortcut listener on Idle page")
        ShortcutAPI.addGlobalShortcutListener(handleGoHome)
        return () => {
            ShortcutAPI.removeGlobalShortcutListener(handleGoHome);
        };
    }, [pathname]);

    return null


}