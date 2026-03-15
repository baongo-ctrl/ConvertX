<?php
function convertx_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'convertx'),
    ));
}
add_action('after_setup_theme', 'convertx_theme_setup');

function convertx_enqueue_styles() {
    wp_enqueue_style('convertx-style', get_stylesheet_uri());
    wp_enqueue_script('tailwindcss', 'https://cdn.tailwindcss.com', array(), '3.4.1', false);
    
    // Add Tailwind config inline to match ConvertX branding
    $tailwind_config = "
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        emerald: { 500: '#10b981', 600: '#059669' },
                        slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    ";
    wp_add_inline_script('tailwindcss', $tailwind_config, 'before');
}
add_action('wp_enqueue_scripts', 'convertx_enqueue_styles');
?>
