<?php get_header(); ?>
<main class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-emerald-600 font-semibold tracking-wider uppercase text-sm">Góc Nhìn</span>
            <h1 class="mt-2 text-4xl font-extrabold text-slate-900">Blog Tăng Trưởng B2B</h1>
            <p class="mt-4 text-xl text-slate-600">Chiến lược, chiến thuật và góc nhìn chuyên sâu để mở rộng doanh thu B2B của bạn.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                <article class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                    <?php if (has_post_thumbnail()) : ?>
                        <a href="<?php the_permalink(); ?>" class="block overflow-hidden">
                            <?php the_post_thumbnail('large', ['class' => 'w-full h-48 object-cover hover:scale-105 transition-transform duration-300']); ?>
                        </a>
                    <?php else: ?>
                        <div class="w-full h-48 bg-slate-100 flex items-center justify-center">
                            <span class="text-slate-400">ConvertX</span>
                        </div>
                    <?php endif; ?>
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="text-sm text-emerald-600 font-medium mb-2"><?php the_category(', '); ?></div>
                        <h2 class="text-xl font-bold text-slate-900 mb-3"><a href="<?php the_permalink(); ?>" class="hover:text-emerald-600 transition-colors"><?php the_title(); ?></a></h2>
                        <div class="text-slate-600 mb-6 line-clamp-3 flex-grow">
                            <?php the_excerpt(); ?>
                        </div>
                        <div class="flex items-center justify-between text-sm text-slate-500 mt-auto pt-4 border-t border-slate-100">
                            <span class="font-medium text-slate-700"><?php the_author(); ?></span>
                            <span><?php echo get_the_date(); ?></span>
                        </div>
                    </div>
                </article>
            <?php endwhile; else : ?>
                <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-100">
                    <p class="text-slate-600 text-lg">Chúng tôi đang chuẩn bị những nội dung giá trị cao dành cho bạn. Vui lòng quay lại sau!</p>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="mt-16 flex justify-center">
            <?php 
                the_posts_pagination(array(
                    'mid_size' => 2,
                    'prev_text' => '&laquo; Trước',
                    'next_text' => 'Sau &raquo;',
                    'class' => 'pagination-links flex gap-2'
                )); 
            ?>
        </div>
    </div>
</main>
<?php get_footer(); ?>
