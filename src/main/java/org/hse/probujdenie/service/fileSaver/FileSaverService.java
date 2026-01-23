package org.hse.probujdenie.service.fileSaver;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

import static org.hse.probujdenie.util.UuidService.generateId;

@Service
@RequiredArgsConstructor
public class FileSaverService {
    private final S3Client client;
    private final String bucket = "probujdenie";

    public UUID save(byte[] bytes, String contentType, String prefix) {
        UUID id = generateId();
        String key = prefix + id;

        client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(key)
                        .contentType(contentType)
                        .build(),
                RequestBody.fromBytes(bytes)
        );
        return id;
    }

    public byte[] get(String key) throws IOException {
        var object = client.getObject(r -> r.bucket(bucket).key(key));
        return object.readAllBytes();
    }

    public UUID savePhotoCourse(byte[] photoBytes) {
        String prefix = "courses/";

        return save(photoBytes, "image/png", prefix);
    }

    public UUID saveLectureContent(byte[] source) {
        String prefix = "lectures/";

        return save(source, "application/json", prefix);
    }

    public byte[] getLectureContent(UUID id) {
        try {
            String key = "lectures/" + id;
            return get(key);
        } catch (Exception e){
            throw new IllegalArgumentException(e.getMessage());
        }

    }

    public byte[] getPhoto(UUID id) {
        try {
            String key = "courses/" + id;
            return get(key);
        } catch (Exception e){
            throw new IllegalArgumentException(e.getMessage());
        }

    }

}
