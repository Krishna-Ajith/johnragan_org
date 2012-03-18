import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;

public class FileIO {
 public static void main(String[] args) throws IOException, InterruptedException {
   String PATH = "C:\\fileio";
   getPathInfo(PATH);

   getFileSystemInfo(PATH);

   navigatePath(PATH);

   watchPath(PATH);
 }

 private static void watchPath(String path) throws IOException, InterruptedException {
   System.out.println("Watching " + path);
   Path pathToFile = new File(path).toPath();

   WatchService watchService = pathToFile.getFileSystem().newWatchService();

   pathToFile.register(watchService, StandardWatchEventKind.ENTRY_MODIFY);

   WatchKey watchKey = watchService.take();

   //Go ahead and modify a file in the C:\\fileio directory.

   for (WatchEvent<?> watchEvent : watchKey.pollEvents()) {
     System.out.println(watchEvent.context());
   }
 }

 private static void navigatePath(String path) throws IOException {
   System.out.println("Navigating " + path);
   Files.walkFileTree(new File(path).toPath(), new FileVisitor() {
     public FileVisitResult preVisitDirectory(Object dir) {
       System.out.println("Pre visit to directory " + dir);
       return FileVisitResult.CONTINUE;
     }

     public FileVisitResult preVisitDirectoryFailed(Object dir, IOException exc) {
       System.out.println("Pre visit failed to directory " + dir);
       return FileVisitResult.CONTINUE;
     }

     public FileVisitResult preVisitDirectory(Object file,BasicFileAttributes attrs) {
	System.out.println("Pre visit to file " + file);
        return FileVisitResult.CONTINUE;
     }

     @Override
     public FileVisitResult visitFile(Object file, BasicFileAttributes attrs) {
       System.out.println("Visit to file " + file);
       return FileVisitResult.CONTINUE;
     }

     @Override
     public FileVisitResult visitFileFailed(Object file, IOException exc) {
       System.out.println("Visit failed to file " + file);
       return FileVisitResult.CONTINUE;
     }

     @Override
     public FileVisitResult postVisitDirectory(Object dir, IOException exc) {
       System.out.println("Post visit to dir " + dir);
       return FileVisitResult.CONTINUE;
     }
   });
 }

 private static void getFileSystemInfo(String path) {
   FileSystem fileSystem = new File(path).toPath().getFileSystem();

   System.out.println("File System is " + fileSystem);

   System.out.println("Root directories are:");
   for (Path aRootDir : fileSystem.getRootDirectories()) {
     System.out.println(aRootDir);
   }
 }

 private static void getPathInfo(String path) {
   File file = new File(path);
   Path pathToFile = file.toPath();

   System.out.println("Path is " + pathToFile);
 }
}