const Musicalizador = {
    audios: [],
    inicializarAudio(audios) {
        this.audios = audios;
        this.audios.forEach((audio) => {
            const element = document.createElement('audio');
            element.src = audio.src;
            audio.element = element;
        });
    }, 
    reproducir(idAudio) {
        const audio = this.buscarAudio(idAudio);
        if(audio) {
            audio.element.play()
            .catch(() => {
                return;
            });
        }
    },
    detener(idAudio) {
        const audio = this.buscarAudio(idAudio);
        if(audio) {
            audio.element.pause();
        }
    },
    buscarAudio(idAudio) {
        return this.audios.find(audio => audio.id === idAudio);
    },
};