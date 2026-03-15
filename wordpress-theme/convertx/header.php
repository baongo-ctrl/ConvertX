<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .prose img { border-radius: 0.5rem; }
        .prose a { color: #10b981; text-decoration: none; }
        .prose a:hover { text-decoration: underline; }
    </style>
</head>
<body <?php body_class('bg-slate-50 text-slate-900'); ?>>
    <header class="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <div class="flex items-center gap-2">
                    <a href="<?php echo home_url(); ?>">
                        <img src="https://i.ibb.co/ynwgXj1L/Logo-Convertx.png" alt="ConvertX Logo" class="h-10 w-auto rounded" />
                    </a>
                </div>
                <nav class="hidden md:flex items-center gap-8">
                    <a href="<?php echo home_url('/'); ?>" class="text-sm font-medium hover:text-emerald-400 transition-colors">Home</a>
                    <a href="<?php echo home_url('/blog'); ?>" class="text-sm font-medium text-emerald-500">Blog</a>
                </nav>
            </div>
        </div>
    </header>
