import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

// theme: {
//     themes: {
//         light: {
//             primary: '#1d4d4f',
//             secondary: '#6ba8a9',
//             accent: '#357376'
//         }
//     }
// }

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#0033A0',
                secondary: '#00A9E0',
                accent: '#D64309',
                error: '#FF6A14',
                info: '#006BA6',
                success: '#006BA6',
                warning: 'FF8200'
            }
        }
    }
});
