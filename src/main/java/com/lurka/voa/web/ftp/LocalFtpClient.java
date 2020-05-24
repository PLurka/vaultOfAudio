package com.lurka.voa.web.ftp;

import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

import java.io.*;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public class LocalFtpClient {
    private String server;
    private int port;
    private String user;
    private String password;
    private FTPClient ftp;

    public LocalFtpClient(String server, int port, String user, String password){
        this.server = server;
        this.port = port;
        this.user = user;
        this.password = password;
    }

    public void open() throws IOException {
        ftp = new FTPClient();

        ftp.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));

        ftp.connect(server, port);
        int reply = ftp.getReplyCode();
        if (!FTPReply.isPositiveCompletion(reply)) {
            ftp.disconnect();
            throw new IOException("Exception in connecting to FTP Server");
        }

        ftp.login(user, password);
    }

    public void close() throws IOException {
        ftp.disconnect();
    }

    public Collection<String> listFiles(String path) throws IOException {
        FTPFile[] files = ftp.listFiles(path);
        return Arrays.stream(files)
            .map(FTPFile::getName)
            .collect(Collectors.toList());
    }

    public void downloadFile(String source, String destination) throws IOException {
        FileOutputStream out = new FileOutputStream(destination);
        ftp.retrieveFile(source, out);
    }

    public InputStream streamFile(String source) throws IOException {
        return ftp.retrieveFileStream(source);
    }

    public void downloadToFile(String source, File destination) throws IOException {
        FileOutputStream out = new FileOutputStream(destination);
        ftp.retrieveFile(source, out);
    }

    public void putFileToPath(File file, String path) throws IOException {
        ftp.setFileType(FTP.BINARY_FILE_TYPE);
        ftp.storeFile(path, new FileInputStream(file));
    }

    public void renameFile(String from, String to) throws IOException{
        ftp.rename(from, to);
    }

    public boolean deleteFile(String pathname) throws IOException{
        return ftp.deleteFile(pathname);
    }
}
