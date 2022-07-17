# Linux 桌面

Linux 本身并没有桌面，其图形界面只是


- 桌面管理器 sddm(Simple Desktop Display Manager)
- KDE 桌面系统

## SDDM
/etc/sddm.conf.d/90-monitor.conf
设置显示器尺寸则会自动计算 DPI.

/usr/share/X11/xorg.conf.d/screen-resolution.conf
设置分辨率
- xrandr --current    
    - 标记[connected]的前面的即为显示器名称
- xrandr --output [名称] -mode 1920x1080

## plasma
/usr/share/X11/xorg.conf.d/
在 System Config > Monitor > 设置。

16:10 8:5
39.624^2 = 16^2x^2 + 10^2x^2 = x^2(16^2+10^2)