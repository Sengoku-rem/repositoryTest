# repositoryTest
2022年 ITスキル実習2
はるはあけぼの

2022.09.06に作ったシェルスクリプト

#!/bin/sh

echo "___START___"
BASE_DIR=`pwd`

zip -r readyToTransfarFolder.zip *
mkdir 転送可能なzipが入っています
mv readyToTransfarFolder.zip 転送可能なzipが入っています

echo "${BASE_DIR}内での実行が終わりました"

exit
