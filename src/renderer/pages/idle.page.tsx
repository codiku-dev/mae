import { ROUTES } from "@/routes";
import { logToMain } from "../libs/utils";

import { WindowAPI } from "@/main/modules/window/window-api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ShortcutAPI } from "@/main/modules/shortcuts/shortcut-api";

export function IdlePage() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    useEffect(() => {

        const handleGoHome = () => {
            navigate(ROUTES.home)
            WindowAPI.toggleWindowWithAnimation(true)
        }
        ShortcutAPI.addGlobalShortcutListener(handleGoHome)
        return () => {
            ShortcutAPI.removeGlobalShortcutListener(handleGoHome);
        };
    }, [pathname]);

    return null


}