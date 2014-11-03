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
        'file' => null,
    ],
    [
        'name' => '1st floor',
        'options' => [
            [
                'name' => 'Side Entry Garage',
                'file' => null,
            ],
            [
                'name' => 'Alt. Owner\'s Bathroom w/o Tub',
                'file' => null,
            ]
        ],
        'file' => null,
    ],
    [
        'name' => '2nd floor',
        'options' => [],
        'file' => null,
    ],
];

echo json_encode($ifp);
