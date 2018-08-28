<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/RPartList/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/rpartlist')) {
            $cache->deleteTree(
                $dev . 'assets/components/rpartlist/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/rpartlist/', $dev . 'assets/components/rpartlist');
        }
        if (!is_link($dev . 'core/components/rpartlist')) {
            $cache->deleteTree(
                $dev . 'core/components/rpartlist/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/rpartlist/', $dev . 'core/components/rpartlist');
        }
    }
}

return true;