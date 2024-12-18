import { registerBlockType } from '@wordpress/blocks';
import EditComponent from './editor'; // Import the Edit component from editor.js
import SaveComponent from './save'; // Import the Save component from save.js
import './style.scss';

// Register the block
registerBlockType('dynamic-pricing-block/price-plans', {
    title: 'Dynamic Pricing Block',
    description: 'A custom pricing block with different plans that can dynamically add features.',
    icon: 'table-col-after',
    category: 'widgets',
    edit: EditComponent,
    save: SaveComponent,
    attributes: {
        plans: {
            type: 'array',
            default: [
                {
                    title: 'New Plan',
                    price: '$0',
                    features: ['Feature 1', 'Feature 2'],
                    buttonLabel: 'Sign up for free',
                    buttonURL: '',
                    buttonOpenInNewTab: false,
                    buttonNoFollow: false,
                },
            ],
        },
    },
});
