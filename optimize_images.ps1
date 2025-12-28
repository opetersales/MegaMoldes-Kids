# Script de Otimização de Imagens (Requer ImageMagick)
# Instale o ImageMagick: https://imagemagick.org/script/download.php#windows

$ErrorActionPreference = "Stop"

if (!(Get-Command "magick" -ErrorAction SilentlyContinue)) {
    Write-Host "ERRO: ImageMagick não encontrado." -ForegroundColor Red
    Write-Host "Por favor, instale o ImageMagick para Windows e certifique-se de marcar 'Add to PATH' durante a instalação."
    Write-Host "Download: https://imagemagick.org/script/download.php#windows"
    exit 1
}

$imgDir = Join-Path $PSScriptRoot "assets\img"
$images = Get-ChildItem $imgDir -Include *.png, *.jpg, *.jpeg -Recurse

Write-Host "Iniciando otimização de imagens..." -ForegroundColor Green

foreach ($img in $images) {
    $baseName = $img.BaseName
    $extension = $img.Extension.ToLower()
    $relPath = $img.FullName.Replace($PSScriptRoot, "")
    
    Write-Host "Processando: $relPath"
    
    # 1. Converter para AVIF (Melhor compressão, moderno)
    $avifPath = Join-Path $img.DirectoryName "$baseName.avif"
    if (!(Test-Path $avifPath)) {
        Write-Host "  -> Gerando AVIF..." -NoNewline
        magick "$($img.FullName)" -quality 50 -define avif:speed=6 "$avifPath"
        Write-Host " OK" -ForegroundColor Green
    }

    # 2. Converter para WebP (Fallback compatível)
    $webpPath = Join-Path $img.DirectoryName "$baseName.webp"
    if (!(Test-Path $webpPath)) {
        Write-Host "  -> Gerando WebP..." -NoNewline
        magick "$($img.FullName)" -quality 80 "$webpPath"
        Write-Host " OK" -ForegroundColor Green
    }
}

Write-Host "`nOtimização concluída!" -ForegroundColor Green
Write-Host "Agora você pode atualizar o HTML para usar as versões .avif e .webp usando a tag <picture>."
