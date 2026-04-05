package org.hse.probujdenie.util;

import lombok.experimental.UtilityClass;
import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.jspecify.annotations.NonNull;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@UtilityClass
public class FileUtil {

    public static @NonNull Path getSubmissionFolder(UUID submissionId) {
        return Path.of("/app/student_submissions/", submissionId.toString());
    }

    public static @NonNull File getSubmissionFolderAsFile(StudentSubmission submission) {
        return getSubmissionFolder(submission.getId()).toFile();
    }

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

    public static void deleteDirectory(Path path) throws IOException {
        if (Files.exists(path)) {
            try (var walk = Files.walk(path)) {
                walk.sorted(Comparator.reverseOrder())
                    .forEach(p -> {
                        try {
                                Files.delete(p);
                        } catch (IOException e) {
                                System.err.println("Не удалось удалить: " + p + " → " + e.getMessage());
                        }
                    });
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
