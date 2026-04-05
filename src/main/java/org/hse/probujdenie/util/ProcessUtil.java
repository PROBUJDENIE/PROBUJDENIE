package org.hse.probujdenie.util;

import lombok.experimental.UtilityClass;
import org.jspecify.annotations.NonNull;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;

@UtilityClass
public class ProcessUtil {

    public static @NonNull String getProcessLogs(Process process) throws IOException {
        String logs;
        try (InputStream is = process.getInputStream()) {
            logs = new String(is.readAllBytes(), StandardCharsets.UTF_8);
        }
        return logs;
    }

    public static void sendInputValuesToContainer(Process process, String[] inputValues) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(process.getOutputStream(), StandardCharsets.UTF_8))) {
            for (String value: inputValues) {
                writer.write(value + "\n");
            }
            writer.flush();
        }
    }
}
