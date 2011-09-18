package dwmj.index;

import java.util.List;
import dwmj.domain.JarFile;

public interface IndexService {
  void addJarFile(JarFile jarFile);
  List<JarFile> findJarFiles(String searchString);
  void removeJarFile(JarFile jarFile);
}