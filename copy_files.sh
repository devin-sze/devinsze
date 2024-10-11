for folder in "about" "portfolio"
do
    cp style.css ${folder}/style.css        # copy css to 2 other primary folders
    cp logo_* ${folder}                     # copy logos to 2 other primary folders
    cp home.js ${folder}/home.js            # copy js functions to 2 other primary folders
done

cp github.png portfolio/github.png
cp arxiv.png portfolio/arxiv.png

for folder in "2048" "about" "chatbot" "clock" "IAE" "labyrinth" "metaballs" "portfolio" "shortestpath" "snake"
do
    cp logo_devinsze_img.png ${folder}/logo_devinsze_img.png
done