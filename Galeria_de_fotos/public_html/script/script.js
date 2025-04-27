$(document).ready(function() {

    function carregarImagens() {
        const imagensSalvas = JSON.parse(localStorage.getItem('galeria')) || [];

        if (imagensSalvas.length === 0) {
            $('.mensagem-vazia').show();
        } else {
            $('.mensagem-vazia').hide();
            imagensSalvas.forEach(url => {
                const img = $('<img>').attr('src', url).addClass('imagem-galeria');
                $('.galeria').append(img);
            });
        }
    }

    function salvarImagens() {
        const imagens = [];

        $('.imagem-galeria').each(function() {
            imagens.push($(this).attr('src'));
        });

        localStorage.setItem('galeria', JSON.stringify(imagens));

        if (imagens.length === 0) {
            $('.mensagem-vazia').show();
        } else {
            $('.mensagem-vazia').hide();
        }
    }

    carregarImagens();

    $('.btn-nova-imagem').click(function() {
        $('.formulario').slideDown();
    });

    $('.btn-cancelar').click(function() {
        $('.formulario').slideUp();
    });

    $('.btn-adicionar').click(function() {
        const urlImagem = $('.input-url').val().trim();

        if (urlImagem !== '' && (urlImagem.endsWith('.jpg') || urlImagem.endsWith('.jpeg') || urlImagem.endsWith('.png') || urlImagem.endsWith('.gif'))) {
            const novaImagem = $('<img>').attr('src', urlImagem).addClass('imagem-galeria');
            $('.galeria').append(novaImagem);

            salvarImagens();

            $('.input-url').val('');
            $('.formulario').slideUp();
        } else {
            alert('Por favor, insira uma URL de imagem válida (jpg, png ou gif).');
        }
    });

    $('.galeria').on('click', '.imagem-galeria', function() {
        if (confirm('Deseja realmente excluir esta imagem?')) {
            $(this).remove();
            salvarImagens();
        }
    });

    // Função de limpar toda a galeria
    $('.btn-limpar-galeria').click(function() {
        if (confirm('Tem certeza que deseja limpar TODA a galeria?')) {
            $('.galeria').empty();
            localStorage.removeItem('galeria');
            $('.mensagem-vazia').show();
        }
    });
    
    // Atualizar preview conforme digita a URL
    $('.input-url').on('input', function() {
        const url = $(this).val().trim();

        if (url !== '' && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif'))) {
            $('.preview-img').attr('src', url).fadeIn();
        } else {
            $('.preview-img').fadeOut();
        }
    });
});
