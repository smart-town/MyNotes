# Android 签名

## 为什么签名

开发时，可能不同的人会起相同的类名、包名。签名就是在此时起区分作用的。

开发商可能通过相同的 package name 来混淆替换已经安装的程序，签名可以保证相同名字，但是签名不同的包不被替换。

APK 如果使用一个 key 签名，发布时另一个 key 签名的文件将无法安装或覆盖老的版本，这样可以防止你已经安装的应用被恶意的第三方应用覆盖或替换。

也是开发者的身份标识，交易中抵赖发生时，签名可以防止。

## 签名注意事项

可以使用`keytool`生成秘钥，来签名应用程序的`apk`文件。

命令：`keytool -genkey -alias android.keystore -keyalg RSA -validity 20000 -keystore android.keystore`


### 从APK中获取签名信息

`keytool -list -printcert -jarfile you.apk` 输出签名信息。

### 从签名文件中获取签名信息

`keytool -list -v -keystore keystore.file`

