import { registerBlockType } from '@wordpress/blocks';
import EditComponent from './editor'; // Import the Edit component from editor.js
import SaveComponent from './save'; // Import the Save component from save.js
import './style.scss';

// Register the block
registerBlockType('dynamic-pricing-block/price-plans', {
    title: 'Dynamic Pricing Block',
    description: 'A custom pricing block with different plans that can dynamically add features.',
    category: 'widgets',
    icon: 'money',
    edit: EditComponent,
    save: SaveComponent,
    attributes: {
        plans: {
            type: 'array',
            default: [
                {
                    title: 'Free',
                    price: '$0',
                    features: ['10 users included', '2 GB of storage', 'Email support', 'Help center access'],
                    buttonLabel: 'Sign up for free',
                },
            ],
        },
    },


});
