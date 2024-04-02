async function clickedEvent(artworkIndex) {
    const artworkId = document.querySelectorAll('.gallery_img')[artworkIndex].getAttribute('data-artwork-id');

    const headers = new Headers([
        ['Content-Type', 'application/json'],
        ['AIC-User-Agent', 'Your User Agent (bngtngt@gmail.com)'] 
    ]);

    const request = new Request(`https://api.artic.edu/api/v1/artworks/${artworkId}`, {
        method: 'GET',
        headers: headers
    });

    try {
        const response = await fetch(request);
        const artworkData = await response.json();

        const paintingInfo = {
            title: artworkData.data.title,
            artist: artworkData.data.artist_title,
            date: artworkData.data.date_display,
            origin: artworkData.data.place_of_origin,
            medium: artworkData.data.medium_display
        };

        displayInfo(paintingInfo, artworkIndex);
    } catch (error) {
        console.error('Error fetching artwork information:', error);
    }
}

function getPainting(figureId, event) {
    event.stopPropagation();

    switch (figureId) {
        case 'fig1':
            clickedEvent(0);
            break;
        case 'fig2':
            clickedEvent(1);
            break;
        case 'fig3':
            clickedEvent(2);
            break;
        case 'fig4':
            clickedEvent(3);
            break;
        case 'fig5':
            clickedEvent(4);
            break;
        case 'fig6':
            clickedEvent(5);
            break;
        default:
            console.error('Invalid figure ID:', figureId);
    }
}

function displayInfo(info, figureIndex) {
    const targetFigure = document.querySelectorAll('figcaption')[figureIndex];
    targetFigure.classList.add('caption_style');
    targetFigure.innerHTML = `${info.title} by ${info.artist}, painted in ${info.origin ? info.origin : "unknown origin"} in ${info.date}. It was painted using ${info.medium.toLowerCase()}.`;
}
