1. 上传文件：端口转发 连接远程浏览器 传本地文件不可用


# launch Chrome from shell 
# /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
# /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --profile-directory="Profile 2"  # not working 
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir="$HOME/chrome_remote_user_data" --disable-features=site-per-process --window-size=1920,980 > /dev/null 2>&1 &

# doing
# src 目录下的ts 逐渐迁移到utils下