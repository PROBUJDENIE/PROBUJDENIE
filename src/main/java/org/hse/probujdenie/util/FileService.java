package org.hse.probujdenie.util;

import lombok.experimental.UtilityClass;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;

@UtilityClass
public class FileService {

    public static void copyDirectory(Path source, Path target) throws IOException {
        try (var paths = Files.walk(source)) {
            for (Path path : paths.toList()) {
                Path relativePath = source.relativize(path);
                Path targetPath = target.resolve(relativePath);

                if (Files.isDirectory(path)) {
                    Files.createDirectories(targetPath);
                } else {
                    Files.copy(path, targetPath, StandardCopyOption.REPLACE_EXISTING);
                }
            }
        }
    }

    public static void replaceFileContentFromLine(Path filePath, int fromLine, String newContentPart) throws IOException {
        List<String> lines = Files.readAllLines(filePath);

        String prefix = String.join(System.lineSeparator(), lines.subList(0, fromLine - 1));
        String newContent = prefix + System.lineSeparator() + newContentPart;

        Files.writeString(filePath, newContent);
    }
}
