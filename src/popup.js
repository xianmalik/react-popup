/**
 * WPCafePopup
 *
 * WPCafePopup main component
 */
export default class PopupEl extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            data: props.data || 'Hello',
            url: props.url
		};
	}

    closePopoup = () => {
        
    }

    componentDidMount(){
        let content_class = jQuery('#wpc-popup');
        // Variation Form
        var form_variation = content_class.find('.variations_form');
        form_variation.each(function () {
            jQuery(this).wc_variation_form();
        });

        form_variation.trigger('check_variations');
        form_variation.trigger('reset_image');

        if (typeof jQuery.fn.wc_product_gallery !== 'undefined') {
            content_class.find('.woocommerce-product-gallery').each(function () {
                jQuery(this).wc_product_gallery();
            });
        }
    }

    render() {
		return <div className="Popup" dangerouslySetInnerHTML={{ __html: this.props.data }} style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '9999999999',
            height: '60%',
            width: '60%',
            background: '#ffffff',
            boxShadow: '5px 5px 20px rgba(0, 0, 0, .1)'
        }} />;
    }

}