<?php

/**
 * Plugin Name:       Dynamic Pricing Block
 * Description:       A custom pricing block with different 
 *                    plans that can dynamically add features.
 * Requires at least: 6.1
 * Version:           1.0.0
 * Author:            Martin Ndegwa Moche <ndegwamoche@gmail.com>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamic-pricing-block
 * php version:       7.0
 * 
 * @category Plugin
 * @package  DynamicPricingBlock
 * @author   Martin Ndegwa Moche <ndegwamoche@gmail.com>
 * @license  GPL-2.0-or-later https://www.gnu.org/licenses/gpl-2.0.html
 * @link     https://github.com/ndegwamoche/dynamic-pricing-block
 */

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata from block.json.
 * 
 * @return void
 */
function Dynamic_Pricing_Block_register()
{
    //Automatically loads block.json, JS, and CSS
    register_block_type(__DIR__ . '/blocks');
}
add_action('init', 'Dynamic_Pricing_Block_register');

/**
 * Registers custom styles and scripts for the block's editor and frontend display.
 * 
 * This function registers bootstrap styles for the block.
 * 
 * @return void
 */
function Enqueue_Dynamic_Pricing_Block_styles()
{
    // Register Bootstrap CSS
    wp_register_style(
        'dynamic-pricing-block-bootstrap',
        plugin_dir_url(__FILE__) . 'assets/dist/css/bootstrap.min.css',
        array(),
        '5.1.0',
        'all'
    );

    // Register Block specific CSS
    wp_register_style(
        'dynamic-pricing-block-style',
        plugin_dir_url(__FILE__) . 'build/style-index.css',
        array(),
        '1.0.0',
        'all'
    );
}

add_action('enqueue_block_assets', 'Enqueue_Dynamic_Pricing_Block_styles');
