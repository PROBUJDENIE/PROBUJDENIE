package org.hse.probujdenie.util;

import lombok.experimental.UtilityClass;

@UtilityClass
public class LogsUtil {

    public static String getErrorsFromLogs(String logs) {
        return logs.lines()
                .filter(line ->
                        line.contains("[ERROR]"))
                .reduce("", (a, b) -> a + b + System.lineSeparator());
    }
}
