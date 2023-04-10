(async() => {
    const {value: sucursal} = await Swal.fire({
        title:'Bienvenido al Bodegon!',
        text:'Selecciona tu sucursal',
        confirmButtonText:'Seleccionar',
        footer:'Esta es informacion importante!',
        background:'white',
        backdrop: true, 
        position: 'center',
        allowOutsideClick: false,
        allowEnterKey: true,
        allowScapeKey: false,
        stopKeydownPropagation: false,
    
        input: 'select',
        inputPlaceholder:'sucursal',
        inputValue: '',
        inputOptions:{
            cordoba: 'Córdoba',
            salta: 'Salta',
            neuquen: 'Neuquén',
            catamarca: 'Catamarca',
            mendoza: 'Mendoza'
        },

        showConfirmbutton: true,
        confirmButtonColor: 'red',

        showCancelButton:true,
        cancelButtonText:'cancelar',
        cancelButtonColor: 'red',

        buttonsStyling: true , 
        showCloseButton:true,
        closeButtonAriaLabel:"cerrar alerta",

        imageUrl: 'http://www.cocteleria.com.mx/wp-content/uploads/2014/09/las-9-botellas-basicas-que-no-te-pueden-faltar.jpg',
        imageWidth: '60%',
        imageAlt: 'bebidas',

    });

    if (sucursal){
        Swal.fire({
            title: `Seleccionaste ${sucursal}`,
            toast: true,
            position: 'bottom-right',
            timer: 2000 
        });
    };
})();