﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Rucula.Infra.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20221121151005_AddLanguageRuculaRepresentation")]
    partial class AddLanguageRuculaRepresentation
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Rucula.Domain.KeyWord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("LanguageId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.HasKey("Id")
                        .HasName("PrimaryKey_KeyWordId");

                    b.HasIndex("LanguageId");

                    b.ToTable("KeyWords");
                });

            modelBuilder.Entity("Rucula.Domain.Language", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.HasKey("Id");

                    b.ToTable("Languages");
                });

            modelBuilder.Entity("Rucula.Domain.LanguageRucula", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<string>("Description2")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.HasKey("Code")
                        .HasName("PrimaryKey_LAnguageRuculaCode");

                    b.ToTable("LanguagesRucula");
                });

            modelBuilder.Entity("Rucula.Domain.LanguageRuculaRepresentation", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("CodeRuculaForeKey")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("Code")
                        .HasName("PrimaryKey_LanguageRuculaRepresentationCode");

                    b.HasIndex("CodeRuculaForeKey")
                        .IsUnique();

                    b.ToTable("LanguageRuculaRepresentation");
                });

            modelBuilder.Entity("Rucula.Domain.KeyWord", b =>
                {
                    b.HasOne("Rucula.Domain.Language", "Language")
                        .WithMany("KeyWords")
                        .HasForeignKey("LanguageId");

                    b.Navigation("Language");
                });

            modelBuilder.Entity("Rucula.Domain.LanguageRuculaRepresentation", b =>
                {
                    b.HasOne("Rucula.Domain.LanguageRucula", "LanguageRucula")
                        .WithOne("LanguageRuculaRepresentation")
                        .HasForeignKey("Rucula.Domain.LanguageRuculaRepresentation", "CodeRuculaForeKey");

                    b.Navigation("LanguageRucula");
                });

            modelBuilder.Entity("Rucula.Domain.Language", b =>
                {
                    b.Navigation("KeyWords");
                });

            modelBuilder.Entity("Rucula.Domain.LanguageRucula", b =>
                {
                    b.Navigation("LanguageRuculaRepresentation")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
