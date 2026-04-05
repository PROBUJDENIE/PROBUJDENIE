package org.hse.probujdenie.util;

public class DockerUtil {
    public static void cleanupDanglingImages() {
        try {
            ProcessBuilder cleanPb = new ProcessBuilder(
                    "docker", "image", "prune", "-f", "--filter", "dangling=true"
            );

            Process cleanProcess = cleanPb.start();
            int cleanCode = cleanProcess.waitFor();

            if (cleanCode == 0) {
                System.out.println("Промежуточные (<none>) образы успешно удалены.");
            } else {
                System.err.println("Не удалось выполнить docker image prune");
            }

        } catch (Exception e) {
            System.err.println("Ошибка при очистке dangling images: " + e.getMessage());
        }
    }
}
