package com.lurka.voa.web.ftp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockftpserver.fake.FakeFtpServer;
import org.mockftpserver.fake.UserAccount;
import org.mockftpserver.fake.filesystem.DirectoryEntry;
import org.mockftpserver.fake.filesystem.FileEntry;
import org.mockftpserver.fake.filesystem.FileSystem;
import org.mockftpserver.fake.filesystem.UnixFakeFileSystem;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.util.Collection;

public class LocalFtpClientIT {

    private FakeFtpServer fakeFtpServer;
    private LocalFtpClient localFtpClient;

    @Before
    public void setup() throws IOException {
        fakeFtpServer = new FakeFtpServer();
        fakeFtpServer.addUserAccount(new UserAccount("user", "password", "/data"));

        FileSystem fileSystem = new UnixFakeFileSystem();
        fileSystem.add(new DirectoryEntry("/data"));
        fileSystem.add(new FileEntry("/data/foobar.txt", "abcdef 1234567890"));
        fileSystem.add(new FileEntry("/buz.txt", "buzzzzzzzzz"));
        fakeFtpServer.setFileSystem(fileSystem);
        fakeFtpServer.setServerControlPort(0);

        fakeFtpServer.start();

        localFtpClient = new LocalFtpClient("localhost", fakeFtpServer.getServerControlPort(), "user", "password");
        localFtpClient.open();
    }

    @After
    public void teardown() throws IOException {
        localFtpClient.close();
        fakeFtpServer.stop();
    }

    @Test
    public void givenFileIsInRemoteList() throws IOException {
        Collection<String> files = localFtpClient.listFiles("");
        assert(files).contains("foobar.txt");
    }

    @Test
    public void downloadedFileIsOnFilesystem() throws IOException {
        localFtpClient.downloadFile("/buz.txt", "downloaded_buz.txt");
        File downloaded = new File("downloaded_buz.txt");
        assert(downloaded).exists();
        downloaded.delete();
    }

    @Test
    public void downloadedFileIsInFileVariable() throws IOException {
        File downloaded = new File("downloaded_buz.txt");
        localFtpClient.downloadToFile("/buz.txt", downloaded);
        assert(downloaded).exists();
        downloaded.delete();
    }

    @Test
    public void uploadedFileExistsOnRemote()
        throws URISyntaxException, IOException {
        File file = new File("E:/ftp_upload.txt");
        localFtpClient.putFileToPath(file, "/buz.txt");
        assert(fakeFtpServer.getFileSystem().exists("/buz.txt")) == true;
    }

    @Test
    public void renamedFileExistsOnRemote() throws IOException{
        localFtpClient.renameFile("foobar.txt","baz.txt");
        assert(fakeFtpServer.getFileSystem().exists("/data/baz.txt")) == true;
        localFtpClient.renameFile("baz.txt","foobar.txt");
    }

    @Test
    public void deletedFileNotOnRemote() throws IOException{
        //assert(fakeFtpServer.getFileSystem().exists("/data/foobar.txt")) == false;
        localFtpClient.deleteFile("/data/foobar.txt");
        assert(fakeFtpServer.getFileSystem().exists("/data/foobar.txt")) == false;
    }
}



