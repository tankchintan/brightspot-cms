package com.psddev.cms.tool;

import java.util.Map;

import com.psddev.cms.db.ToolUser;
import com.psddev.dari.util.Settings;
import com.psddev.dari.util.StringUtils;

public class KickToolCheck extends ToolCheck {

    @Override
    public String getName() {
        return "kick";
    }

    @Override
    protected ToolCheckResponse doCheck(ToolUser user, String url, Map<String, Object> parameters) {
        if (Settings.isProduction() && url != null) {
            if (url.contains("logIn.jsp")) {
                if (user != null) {
                    return new ToolCheckResponse("kickIn",
                            "returnPath", StringUtils.getQueryParameterValue(url, "returnPath"));
                }

            } else {
                if (user == null) {
                    return new ToolCheckResponse("kickOut");
                }
            }
        }

        return null;
    }
}
