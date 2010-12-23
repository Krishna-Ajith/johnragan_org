import java.util.Set;

import org.compass.annotations.Index;
import org.compass.annotations.Searchable;
import org.compass.annotations.SearchableId;
import org.compass.annotations.SearchableProperty;
import org.compass.annotations.Store;

@Searchable(alias = "jar" )
public class JarFile {
@SearchableProperty(store = Store.YES, index = Index.UN_TOKENIZED)
private String repository;
@SearchableProperty(store = Store.YES, index = Index.UN_TOKENIZED)
private String groupId;
@SearchableProperty(store = Store.YES, index = Index.UN_TOKENIZED)
private String artifactId;
@SearchableProperty(store = Store.YES, index = Index.UN_TOKENIZED)
private String version;
@SearchableProperty(store = Store.YES, index = Index.UN_TOKENIZED)
private boolean snapshot;
@SearchableProperty(store = Store.YES, index = Index.UN_TOKENIZED)
private String rawUrl;
@SearchableProperty(store = Store.YES, index = Index.UN_TOKENIZED)
private boolean hasSource;
@SearchableProperty(store = Store.YES, index = Index.UN_TOKENIZED)
private boolean hasJavadoc;
@SearchableProperty(store = Store.YES, index = Index.UN_TOKENIZED)
private String bundleSymbolicName;
private Set<String> packages;
@SearchableProperty(store = Store.YES, index = Index.TOKENIZED)
public String getPackageNames() {
if(packages == null) return "" ;
String packageNames = "" ;
for (String p : packages) {
packageNames += (p + " " );
}
return packageNames;
}
private Set<String> classes;
@SearchableProperty(store = Store.YES, index = Index.TOKENIZED)
public String getClassNames() {
if(classes == null) return "" ;
String classNames = "" ;
for (String c : classes) {
classNames += (c + " " );
}
return classNames;
}
// NOTE: property setter/getter methods left out
// for brevity's sake
@SearchableId
public String getRawUrl() {
return rawUrl;
}
}