<?php

/**
 * Plugin Name:       Dynamic Pricing Block
 * Description:       A custom pricing block with different plans that can dynamically add features.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Martin Ndegwa Moche <ndegwamoche@gmail.com>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamic-pricing-block
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
 */
function dynamic_pricing_block_register()
{
    register_block_type(__DIR__ . '/blocks'); // Automatically loads block.json, JS, and CSS
}
add_action('init', 'dynamic_pricing_block_register');

/**
 * Registers custom styles and scripts for the block's editor and frontend display.
 *
 * This function registers bootstrap styles for the block.
 *
 * @return void
 */

function enqueue_dynamic_pricing_block_styles()
{
    // Register Bootstrap CSS
    wp_register_style(
        'dynamic-pricing-block-bootstrap', // Handle for Bootstrap CSS
        plugin_dir_url(__FILE__) . 'assets/dist/css/bootstrap.min.css', // Path to the file
        array(), // Dependencies (if any)
        '5.1.0', // Version number
        'all' // Media type
    );

    // Register Block specific CSS
    wp_register_style(
        'dynamic-pricing-block-style', // Handle for block-specific styles
        plugin_dir_url(__FILE__) . 'build/style-index.css', // Path to your block styles
        array(), // Dependencies (if any)
        '1.0.0', // Version number
        'all' // Media type
    );
}

add_action('enqueue_block_assets', 'enqueue_dynamic_pricing_block_styles');
