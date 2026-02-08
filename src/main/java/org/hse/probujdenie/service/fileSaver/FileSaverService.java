package org.hse.probujdenie.service.fileSaver;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.model.fileSaver.FileData;
import org.hse.probujdenie.util.CommonConstants;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.UUID;

import static org.hse.probujdenie.util.UuidService.generateId;

@Service
@RequiredArgsConstructor
public class FileSaverService {
    private final S3Client client;
    private final String bucket = CommonConstants.FileSaverConstants.BUCKET;

    public UUID save(MultipartFile file) {
        createBucketIfNotExists(bucket);
        UUID fileKey = generateId();
        PutObjectRequest metadata = createMetadata(fileKey.toString(), file);
        try {
            client.putObject(metadata, RequestBody.fromInputStream(file.getInputStream(), metadata.contentLength()));
            return fileKey;
        } catch (IOException e) {
            throw new RuntimeException("Ошибка сохранения файла: " + e.getMessage());
        }
    }

    private void createBucketIfNotExists(String bucketName) {
        if (!bucketExists(bucketName)) {
            client.createBucket(CreateBucketRequest.builder().bucket(bucketName).build());
        }
    }

    private boolean bucketExists(String bucketName) {
        try {
            client.headBucket(HeadBucketRequest.builder().bucket(bucketName).build());
            return true;
        } catch (NoSuchBucketException e) {
            return false;
        }
    }

    public FileData get(String key) {
        HeadObjectResponse head = client.headObject(
                HeadObjectRequest.builder().bucket(bucket).key(key).build()
        );

        ResponseInputStream<GetObjectResponse> stream = client.getObject(
                GetObjectRequest.builder().bucket(bucket).key(key).build()
        );

        HttpHeaders headers = prepareHeaders(key, head);
        return FileData.builder()
                .httpHeaders(headers)
                .inputStreamResource(new InputStreamResource(stream))
                .build();
    }

    private static HttpHeaders prepareHeaders(String fileKey, HeadObjectResponse head) {
        String contentType = head.contentType();
        if (contentType == null || contentType.isBlank()) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(contentType));

        Long len = head.contentLength();
        if (len != null) {
            headers.setContentLength(len);
        }

        headers.setContentDispositionFormData("attachment", fileKey);
        return headers;
    }


    private PutObjectRequest createMetadata(String key, MultipartFile file) {
        return PutObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .contentType(file.getContentType())
                .contentLength(file.getSize())
                .build();
    }

}
