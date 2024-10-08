for folder in "about" "portfolio"
do
    cp style.css ${folder}/style.css        # copy css to 2 other primary folders
    cp logo_* ${folder}                     # copy logos to 2 other primary folders
    cp home.js ${folder}/home.js            # copy js functions to 2 other primary folders
done