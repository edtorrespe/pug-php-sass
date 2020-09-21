<?php

require_once __DIR__ . '/vendor/autoload.php';

$variables = [
    'title' => 'Mi web',
];

$options = [
    'paths' => [
        './public/views/',
    ],
];

Phug::displayFile('index', $variables, $options);
