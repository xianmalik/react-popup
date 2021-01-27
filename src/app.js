/**
 * WPCafePopup
 *
 * WPCafePopup main component
 */

import PopupEl from './popup.js';
import axios from 'axios';

class WPCafePopup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            loading: true,
            data: 'Hello',
            child: props.child
		};
	}

	/**
	 * Calls when state updates
	 */
	componentDidUpdate(e) {
	}

	componentDidMount(e) {
        this.setState({loading: false});
	}

    popupCall = () => {
        console.time("runtime");

        const {callback, product_id} = this.props;
        const body = {
            action: 'variaion_product_popup_content',
            product_id: product_id,
            wpc_action: 'variation_popup' 
        };

        let form_data = new FormData;
        form_data.append('action', 'variaion_product_popup_content');
        form_data.append('product_id', product_id);
        form_data.append('wpc_action', 'variation_popup');


        jQuery.ajax({
            url: wpc_obj.ajax_url,
            type: 'POST',
            data: body,
            dataType: 'html',
            beforeSend:function(){
            },
            success: function (response) {
                var content_data = JSON.parse(response);
                if (content_data.success == false) {
                    return;
                }
                var parsed_data  = JSON.parse(content_data.data.data);
                // attatch data 
                callback(parsed_data);
            },
            complete:function(){
                console.log("ajax");
                console.timeLog("runtime");
            },
        });
        
        axios.post( wpc_obj.ajax_url, form_data )
        .then(res => {
            return res.data;
        })
        .then(res => {
            var content_data = res;
            if (content_data.success == false) {
                return;
            }
            var parsed_data  = JSON.parse(content_data.data.data);


            // attatch data 
            callback(parsed_data);
        })
        .catch(function (error) {
            console.log(error);
        }).finally(() => {
            console.log("axios");
            console.timeLog("runtime");
        });
    }

	render() {
        if (this.state.loading) return <></>;
		const parent = this;
		const { props, state } = parent;

		return <React.Fragment><div onClick={this.popupCall} dangerouslySetInnerHTML={{ __html: this.props.child }} /></React.Fragment>;
	}
}


/**
 * Init Function
 */
let init = function ($scope) {
    const rootEl = document.getElementById('wpc-popup') || document.createElement('div');
    rootEl.setAttribute("id", "wpc-popup");
    if ( !document.getElementById('wpc-popup') ) document.body.appendChild(rootEl);

	const [el] = $scope.find('.customize_button'); if (!el) return;
    const product_id = $scope.find('.customize_button').data("product_id");
	const templateEl = $scope.find('.customize_button').html(); if (!templateEl) return;

	/**
	 * Renders the main component
	 */
    const callback = (data) => {
        ReactDOM.render(
            React.createElement(PopupEl, {
                data: data
            }),
            rootEl
        );
    }

	ReactDOM.render(
		React.createElement(WPCafePopup, {
            'child': templateEl,
            'callback': (d) => callback(d),
            'product_id': product_id
		}),
		el
	);
};



jQuery(window).on('elementor/frontend/init', () => {
	/**
	 * Calls the init function only on 'Frontend', 'Editor' and 'Preview' view, other than 'metform-form' post type
	 */
	// widgetsList.forEach((event) => {
	// 	elementorFrontend.hooks.addAction('frontend/element_ready/' + event + '.default', init);
	// });
}).on('load', function () {
	const shortcodeEls = document.querySelectorAll('.wpc-customize-btn');

	shortcodeEls.forEach((el) => {
		init(jQuery(el));
	});
    
});
