# copy css to 3 primary folders
for folder in "about" "portfolio"
do
    cp style.css ${folder}/style.css
done

# copy all logos to portfolio folder
cp logo_* portfolio

