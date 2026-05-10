package org.hse.probujdenie.util;

public abstract class CommonConstants {
    private CommonConstants() {
    }

    public static class FileSaverConstants {
        public static final String BUCKET = "probujdenie";
    }

    public static class MetricConstants {
        public static final String USER_LOGIN_COUNT = "user.login.count";
        public static final String CREATE_IMAGE_COUNT = "create.image.count";
        public static final String START_CONTAINER_COUNT_ERROR = "start.container.count";
        public static final String START_CONTAINER_COUNT_SUCCESS = "start.container.count";
        public static final String USER_REGISTRATION_COUNT = "user.registration.count";
        public static final String STUDENT_SUBMISSION_CHECK_DURATION = "student.submission.check.duration";

        public static final String RESULT = "result";
    }
}
