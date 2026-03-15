<?php get_header(); ?>
<main class="py-24 bg-white">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <article>
                <header class="mb-10 text-center">
                    <div class="text-emerald-600 font-medium mb-4 uppercase tracking-wider text-sm"><?php the_category(', '); ?></div>
                    <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight"><?php the_title(); ?></h1>
                    <div class="flex items-center justify-center gap-4 text-slate-500">
                        <span class="font-medium text-slate-700">Tác giả: <?php the_author(); ?></span>
                        <span>&bull;</span>
                        <span><?php echo get_the_date(); ?></span>
                    </div>
                </header>
                
                <?php if (has_post_thumbnail()) : ?>
                    <div class="mb-12 rounded-2xl overflow-hidden shadow-lg">
                        <?php the_post_thumbnail('full', ['class' => 'w-full h-auto']); ?>
                    </div>
                <?php endif; ?>
                
                <div class="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed">
                    <?php the_content(); ?>
                </div>
                
                <footer class="mt-16 pt-8 border-t border-slate-200">
                    <div class="flex flex-wrap gap-2">
                        <?php the_tags('<span class="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">', '</span><span class="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">', '</span>'); ?>
                    </div>
                </footer>
            </article>
        <?php endwhile; endif; ?>
    </div>
</main>
<?php get_footer(); ?>
