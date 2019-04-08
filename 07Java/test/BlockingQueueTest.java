import java.io.File;
import java.io.IOException;
import java.util.Scanner;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

/**
 * 生产者线程枚举在所有子目录下的所有文件并将它们放到一个阻塞队列中。这个操作很快，如果没有上限的话，很快就包含了所有找到的文件。同时启动了大量搜索线程，
 * 每个搜索线程从队列中取出一个文件，，打开它并打印所有包含关键字的行。注意不需要显式的线程同步，在这个程序中，我们使用队列数据结构作为一种同步机制。
 * BlockingQueue
 */
public class BlockingQueueTest {

    private static final int FILE_QUEUE_SIZE = 10;
    private static final int SEARCH_THREADS = 100;
    private static final File DUMMY = new File("");
    private static BlockingQueue<File> queue = new ArrayBlockingQueue<>(FILE_QUEUE_SIZE);

    public static void main(String[] args) {
        try (Scanner in = new Scanner(System.in)) {
            System.out.println("Enter base dirctory:");
            String directory = in.nextLine();
            System.out.println("key word:");
            String keyword = in.nextLine();

            Runnable enumerator = () -> {
                try {
                    enumerate(new File(directory));
                    queue.put(DUMMY);
                } catch (Exception e) {
                    System.out.println("error:" + e.getMessage());
                }
            };

            new Thread(enumerator).start();
            for (int i = 0; i <= SEARCH_THREADS; i++) {
                Runnable searcher = () -> {
                    try {
                        boolean done = false;
                        while (!done) {
                            File file = queue.take();
                            if (file == DUMMY) {
                                queue.put(file);
                                done = true;
                            } else {
                                search(file, keyword);
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                };
                new Thread(searcher).start();
            }
        } catch (Exception e) {
  
        }
    }

    public static void enumerate(File directory) throws Exception {
        File[] files = directory.listFiles();
        for (File file : files) {
            if (file.isDirectory())
                enumerate(file);
            else {
                queue.put(file);
            }
        }
    }

    public static void search(File file, String keyword) throws IOException {
        try (Scanner in = new Scanner(file, "UTF-8")) {
            int lineNumber = 0;
            while (in.hasNextLine()) {
                lineNumber++;
                String line = in.nextLine();
                if (line.contains(keyword)) {
                    System.out.printf("%s:%d:%s%n", file.getPath(), lineNumber, line);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}