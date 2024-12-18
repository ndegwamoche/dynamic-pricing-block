import { registerBlockType } from '@wordpress/blocks';
import EditComponent from './editor'; // Import the Edit component from editor.js
import SaveComponent from './save'; // Import the Save component from save.js

// Import the SCSS file (this will be processed by Webpack)
import './style.scss'; // Ensure that style.scss is in the same directory as index.js

// Register the block
registerBlockType('dynamic-pricing-block/price-plans', {
    title: 'Dynamic Pricing Block',
    description: 'A custom pricing block with different plans that can dynamically add features.',
    category: 'widgets',
    icon: 'money',
    supports: {
        html: false,
    },

    // The Edit component is imported from editor.js
    edit: EditComponent,

    // The Save component is imported from save.js
    save: SaveComponent,
});
