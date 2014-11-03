<?php

$ifp = [
    'albemarle' => [
        'name' => 'Albemarle',
        'floors' => [],
    ],
    'arlington' => [
        'name' => 'Arlington',
        'floors' => [],
    ],
    'augusta' => [
        'name' => 'Augusta',
        'floors' => [],
    ]
];

$ifp['albemarle']['floors'] = [
    [
        'name' => 'basement',
        'options' => [],
        'file' => '',
    ],
    [
        'name' => '1st floor',
        'options' => [],
        'file' => '',
    ],
    [
        'name' => '2nd floor',
        'options' => [],
        'file' => '',
    ],
];

echo json_encode($ifp);
