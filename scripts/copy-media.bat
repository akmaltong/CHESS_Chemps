@echo off
REM Script to copy media files from Game folder to public/media for web serving
REM Run this once before starting the dev server

set SOURCE=E:\ШАХМАТЫ_UE5\Chemp_SWITCH1\Game
set DEST=E:\ШАХМАТЫ_UE5\Chemp_SWITCH1\chess-champions-web\public\media

echo Creating directories...
mkdir "%DEST%\movies" 2>nul
mkdir "%DEST%\screenshots" 2>nul
mkdir "%DEST%\stella" 2>nul
mkdir "%DEST%\figma" 2>nul
mkdir "%DEST%\ui" 2>nul

echo Copying movies...
copy "%SOURCE%\Movies\*.mp4" "%DEST%\movies\" /Y
copy "%SOURCE%\Movies\*.mov" "%DEST%\movies\" /Y

echo Copying screenshots...
xcopy "%SOURCE%\Скрины_с_видео_русские" "%DEST%\screenshots\" /E /I /Y

echo Copying stella backgrounds...
copy "%SOURCE%\Content\Скрины_4к\*.PNG" "%DEST%\stella\" /Y

echo Copying Figma designs...
xcopy "%SOURCE%\Content\Figma" "%DEST%\figma\" /E /I /Y

echo Copying UI elements...
copy "%SOURCE%\Content\Кнопка_влево.PNG" "%DEST%\ui\arrow-left.PNG" /Y
copy "%SOURCE%\Content\Кнопка_вправо.PNG" "%DEST%\ui\arrow-right.PNG" /Y
copy "%SOURCE%\Content\Кнопка_домой.PNG" "%DEST%\ui\home.PNG" /Y

echo Done! Media files copied to public/media/
pause
